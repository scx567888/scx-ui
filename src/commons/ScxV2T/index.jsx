//将 vNodes 渲染到页面中
export default {
    name: "scx-v2t",
    functional: true,
    props: {
        vNodes: {}
    },
    setup(props) {
        return () => props.vNodes
    }
}