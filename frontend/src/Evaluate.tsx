import Nav from './Nav'

function Evaluate(props: { winState: (window: string) => void }) {
    return <>
        <Nav winState={props.winState} selected="evaluate"></Nav>
        this is the eval window
    </>
}

export default Evaluate
