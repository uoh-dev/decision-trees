import Nav from './Nav'

function Evaluate(props: { appState: ({ window }: { window: string }) => void }) {
    return <>
        <Nav appState={props.appState} selected="evaluate"></Nav>
        this is the eval window
    </>
}

export default Evaluate
