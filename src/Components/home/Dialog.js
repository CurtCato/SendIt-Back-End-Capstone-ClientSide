import React, {useRef} from "react"


export default ({toggleDialog, callback}) => {
    const starttime = useRef()

    return (
        <dialog id="dialog--itinerary" className="dialog--time">
            <label htmlFor="starttime">When do you want to ride?</label>
            <input ref={starttime} type="text" name="starttime" autoFocus required />

            <button onClick={() => {
                callback(starttime.current.value)
                starttime.current.value = ""
            }}>Add to Itinerary</button>

            <button style={{
                position: "absolute",
                top: "0.25em",
                right: "0.25em"
            }}
                id="closeBtn"
                onClick={() => toggleDialog(false)}>X</button>
        </dialog>
    )
}