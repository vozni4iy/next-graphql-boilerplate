import React from 'react'
import withNextData from 'src/lib/ssr/withNextData'
import { MainPage } from 'src/containers/pages'

export default withNextData((props) => (<MainPage url={props.url} store={props.store}/>));
