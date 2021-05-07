export function FontFamilyEditor({note,handleChange}){

    return <React.Fragment>
        <input type="list" list="fonts" id="font-picker" name="fontFamily"  onInput={handleChange}/>
        <datalist id="fonts">
        <option value="Arial"></option>
        <option value="Impact"></option>
        <option value="sans-serif"></option>
        </datalist>
    </React.Fragment>
}