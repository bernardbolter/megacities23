import { useDrag } from 'react-dnd'

const DraggablePrint = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'print',
        item: { id, name},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div className="draggable-print" ref={dragRef}>
            {name}
            {isDragging && '😱'}
        </div>
    )
}

export default DraggablePrint