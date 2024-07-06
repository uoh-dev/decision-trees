import Nav from './Nav'

function Create(props: { appState: ({ window }: { window: string }) => void }) {
    return <>
        <Nav appState={props.appState} selected="create"></Nav>
        this is the create window
    </>
}

export default Create
