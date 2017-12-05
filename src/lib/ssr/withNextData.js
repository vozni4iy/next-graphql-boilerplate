/*global process:true*/
/*eslint no-undef: "error"*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from './initApollo'
import initRedux from './initRedux'
import stylesheet from 'styles/index.css'
import { MainWrapper, Container } from 'src/components/styled'
import { Header, Footer } from 'src/containers/decorate'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';


// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default ComposedComponent => {
  return class WithData extends Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    static propTypes = {
      url: PropTypes.object,
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      let serverState = {}

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo()
        const redux = initRedux(apollo)
        // Provide the `url` prop data in case a GraphQL query uses it
        const url = {query: ctx.query, pathname: ctx.pathname}

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            // No need to use the Redux Provider
            // because Apollo sets up the store for us
            <ApolloProvider client={apollo} store={redux}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the store
        const state = redux.getState()

        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState = {
          apollo: { // Only include the Apollo data state
            data: state.apollo.data
          }
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo()
      this.redux = initRedux(this.apollo, this.props.serverState)
      this.theme = getMuiTheme({
        palette: {
          primary1Color: blue500,
          primary2Color: blue700
        },
        userAgent: navigator.userAgent
      });
    }

    render () {
      return (
        // No need to use the Redux Provider
        // because Apollo sets up the store for us
        <MuiThemeProvider muiTheme={this.theme}>
          <ApolloProvider store={this.redux} client={this.apollo}>
              <Container>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <MainWrapper>
                  <Header url={this.props.url}/>
                  <div style={{minHeight: 'calc(100vh - 200px)'}}>
                    <ComposedComponent {...this.props} store={this.redux}/>
                  </div>
                  <Footer />
                </MainWrapper>
              </Container>
            </ApolloProvider>
          </MuiThemeProvider>
      )
    }
  }
}
