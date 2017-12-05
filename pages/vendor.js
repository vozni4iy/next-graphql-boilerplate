import React from 'react'
import withNextData from 'src/lib/ssr/withNextData'
import { Vendor } from 'src/containers/pages'

export default withNextData((props) => (<Vendor url={props.url} store={props.store}/>));
