import {ColorEditor} from './icon-cmps/style-editors/ColorEditor.jsx'
import {FontFamilyEditor} from './icon-cmps/style-editors/FontFamilyEditor.jsx'

export function StyleEditBar(props)
{
    return <div class='style-edit-bar'>
        <ColorEditor {...props}/>
        <FontFamilyEditor {...props}/>
        {/* <FontSizeEditor {...props}/>
        <TextAlignEditor {...props}/> */}
    </div>
}