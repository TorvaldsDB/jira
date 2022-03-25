import React from 'react'
import { List } from './List'
import { SearchPanel } from './SearchPanel'

export const ProjectList = () => {
  return (
    <div>  
        <SearchPanel></SearchPanel>
        <List></List>
    </div>
  )
}
