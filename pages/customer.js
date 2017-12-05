import React from 'react'
import withNextData from 'src/lib/ssr/withNextData'
import { Customer } from 'src/containers/pages'

export default withNextData((props) => (<Customer url={props.url} store={props.store} />));
