import React from 'react';
import createInlineStyleButton from '../../utils/createInlineStyleButton';
import colors from './colors'

export default createInlineStyleButton({
    style: 'ITALIC',
    children: (<i className='iconfont icon-xieti' />),
});

let ColorSpan = (color) => (<span style={{color:color}} className={colors.colorSpan}/>)

let colorCom = () => (
    <div>
        {colors.map(({color}, i) => (
            <div key={`color-${i}`}>
                {createInlineStyleButton({
                    style: 'ITALIC',
                    children: (ColorSpan(color)),
                })}
            </div>
        ))}
    </div>
)
colors.map((color, i) => (
    <div >

    </div>
))

