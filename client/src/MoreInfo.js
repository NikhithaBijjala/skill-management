import { useNavigate } from "react-router-dom";
const MoreInfo = () => {
    const navigation = useNavigate()
    return (<>
        <h1>Additional Information in child route</h1>
        <p>You cannot have child routes in index route.</p>
        <p>In react, you have only bubbling phase, not capturing phase. You can prevent them by using stopPropagation,
            can acheve the capturing phase by onclickCapturing</p>
        <p>Prevent default prevents default actions like referishing the page on onSubmit</p>
        <button onClick={() => { navigation("/addition") }}>Back</button>
    </>)
}
export default MoreInfo