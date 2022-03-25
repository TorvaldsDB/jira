import React, {useState} from 'react'

export const SearchPanel = () => {
const [param, setParam] = useState({
    name: '',
    personId: ''
})
  return (
<form action="">
    <div>
        <input type="text" value={param.name} onChange={e => setParam({
            ...param,
            name: e.target.value
        })} />
    </div>
</form>
  )
}
