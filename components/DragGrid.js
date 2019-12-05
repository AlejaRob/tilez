import React, { useState } from 'react';

export default function DragGrid(props) {
    const [gridItems, setGridItems] = useState(props.gridItems);
    const [styles, setStyles] = useState(props.styles);
    const [tileRelease, setTileRelease] = useState(props.tileRelease);
    const [mLeft, setMLeft] = useState(props.mLeft);
    const [mTop, setMTop] = useState(props.mTop);
    const [getOpacity, setGetOpacity] = useState(props.getOpacity);
    const [offset, setOffset] = useState(props.offset);
    return (
        <DragDropGrid
        style={[styles.grid, {opacity: getOpacity()}]}
        ref={sortGrid => {
          this.sortGrid = sortGrid
        }}
        blockTransitionDuration={300}
        activeBlockCenteringDuration={200}
        itemsPerRow={3}
        dragActivationTreshold={10}
        onDragRelease={(itemOrder) => {tileRelease(itemOrder)}}
        onDragStart={(key) => {}}>
          {
            gridItems.map((val, index) => {
              return (
                <View key={val} style={styles.block}>
                  <Image style={[styles.photo, {marginTop: mTop[val]*offset, marginLeft: mLeft[val]*offset}]} source={require('../assets/strawberries.jpeg')}/>
                </View>
              )
            })
          }
      </DragDropGrid>
    )
}
