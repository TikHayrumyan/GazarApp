import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SmallCheckSvg(props) {
  return (
    <Svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width={15} height={15} {...props}>
      <Path d="M77.248 415.04a64 64 0 0190.496 0l226.304 226.304L846.528 188.8a64 64 0 1190.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 010-90.496z" />
    </Svg>
  )
}

export default SmallCheckSvg