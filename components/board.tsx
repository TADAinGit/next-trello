"use client"
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd"
import Column from './Column'
type Props = {}

const Board = (props: Props) => {
    const [board, getBoard, setBoardState] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState]);
    // const  = useBoardStore((state) => state.board);

    useEffect(() => {
        getBoard()
    }, [getBoard])

    console.log(board)

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        console.log(result)

        if (!destination) return;

        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1)

            entries.splice(destination.index, 0, removed)

            const rearrangedColumn = new Map(entries)
            console.log(rearrangedColumn)
            setBoardState({
                ...board,
                columns: rearrangedColumn
            })
        };

        const columns = Array.from(board.columns);
        console.log({ columns })
        const startColIndex = columns[Number(source.droppableId)];
        const endColIndex = columns[Number(destination.droppableId)];

        console.log({ startColIndex, endColIndex })
        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const endCol: Column = {
            id: endColIndex[0],
            todos: endColIndex[1].todos
        }

        // console.log({ startCol, endCol })
        if (!startCol || !endCol) return;
        if (source.index === destination.index && startCol === endCol) return;
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) => (
                    <div
                        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {Array.from(board.columns.entries()).map(([id, column], index) => (
                            <Column
                                key={id}
                                id={id}
                                todos={column.todos}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </DragDropContext>
    )
}

export default Board