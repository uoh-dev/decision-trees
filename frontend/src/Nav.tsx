import reactLogo from './assets/866532842400907285.png'

function Nav(props: { winState: (window: string) => void; selected: string }) {
    return (
        <div className="topnav">
            <img src={reactLogo} className="logo react" alt="Logo" />
            <a onClick={() => props.winState("browse")} target="_blank" className={props.selected === "browse" ? "active" : ""}>Browse</a>
            <a onClick={() => props.winState("create")} target="_blank" className={props.selected === "create" ? "active" : ""}>Create</a>
            <a onClick={() => props.winState("evaluate")} target="_blank" className={props.selected === "evaluate" ? "active" : ""}>Evaluate</a>
        </div>
    );
}

export default Nav
