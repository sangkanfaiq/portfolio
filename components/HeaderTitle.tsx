import React from 'react'

interface HeaderTitle {
    label: string;
    title: string
}

const HeaderTitle = ({label, title}: HeaderTitle) => {
  return (
    <div className='header-margin'>
        <h5 className='font-light text-xs color-secondary'>{label}</h5>
        <h3 className='font-bold text-lg color-primary' style={{marginTop: 15}}>{title}</h3>
    </div>
  )
}

export default HeaderTitle