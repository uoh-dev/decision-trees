import reactLogo from './assets/react.svg'

function Nav(props: { appState: ({ window }: { window: string }) => void; selected: string }) {
    return (
        <div className="topnav">
            <img src={reactLogo} className="logo react" alt="Logo" />
            <a onClick={() => props.appState({ window: "browse" })} target="_blank" className={props.selected === "browse" ? "active" : ""}>Browse</a>
            <a onClick={() => props.appState({ window: "create" })} target="_blank" className={props.selected === "create" ? "active" : ""}>Create</a>
            <a onClick={() => props.appState({ window: "evaluate" })} target="_blank" className={props.selected === "evaluate" ? "active" : ""}>Evaluate</a>
        </div>
    );
}

export default Nav
