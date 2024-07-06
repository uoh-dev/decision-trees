import Nav from './Nav'

function Browse(props: { appState: ({ window }: { window: string }) => void }) {
    return <>
        <Nav appState={props.appState} selected="browse"></Nav>
        this is the browse window
    </>
}

export default Browse
