import Nav from './Nav'

function Browse(props: { trees: { name: string, description: string }[], winState: (window: string) => void }) {
    return <>
        <Nav winState={props.winState} selected="browse"></Nav>
        <div style={{ display: "flex", float: "left" }}>
            {props.trees.map(({ name, description }) => <div className="panel">
                <h2 style={{ display: "inline" }}>{name}</h2><br />
                <span style={{ fontStyle: "italic" }}>{description}</span>
            </div>)}
        </div>
    </>
}

export default Browse
