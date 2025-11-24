import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// services
import { loadBoards, updateBoard, removeBoard, setIsBoardEditorOpen } from '../store/actions/board.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board'

// cmps
import { BoardList } from '../cmps/Board/BoardList'
import { SvgIcon } from '../cmps/SvgIcon'
import { AppLoader } from '../cmps/AppLoader'
import { userService } from '../services/user'
import { makeId } from '../services/util.service'
import { signup } from '../store/actions/user.actions'
import { useNavigate } from 'react-router'
import { filter } from 'lodash'
import { log10 } from 'chart.js/helpers'



export function BoardIndex({ setIsSideBarOpen }) {

    const isAppLoading = useSelector(state => state.systemModule.isAppLoading)
    const boards = useSelector(storeState => storeState.boardModule.boards)

    const [user, setUser] = useState(userService.getLoggedinUser())
    const [filterBy, setFilterBy] = useState({ memberId: user?._id })

    const [isBoardsCollapse, setIsBoardsCollapse] = useState(false)
    const [isFavCollapse, setIsFavCollapse] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        setFilterBy(prevFilter => ({ ...prevFilter, memberId: user?._id }))
        console.log(filterBy);
    }, [user])

    useEffect(() => {
        if (!user) navigate('/')
        loadBoards(filterBy)
    }, [filterBy])


    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onUpdateBoard(board, valsToUpdate) {

        const boardToSave = { ...structuredClone(board), ...valsToUpdate }

        try {
            const savedBoard = await updateBoard(boardToSave)
            showSuccessMsg(`Board ${savedBoard.title} updated`)
        } catch (err) {
            showErrorMsg('Cannot update board')
            throw err;
        }
    }

    function toggleIsCollapse(container) {
        if (container === 'boards') setIsBoardsCollapse(!isBoardsCollapse)
        else setIsFavCollapse(!isFavCollapse)
    }

    if (isAppLoading || !user) return <AppLoader />
    return (
        <section className="board-index">
            <header className='board-index-header'>
                <div className="welcome-notice">
                    <span className='morning'>Good morning, {<span className="user-name">{user?.fullname}</span>}!</span>
                    <span className='text'>Quickly access your recent boards, Inbox and workspaces</span>
                </div>
                {/* <button className='blue' onClick={() => setIsBoardEditorOpen(true)}>Add New Board</button> */}
            </header>
            {/* <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

            <div className='board-list-container favorites-board-list'>
                <div className='board-list-title flex'>

                    <div className='board-list-collapse-toggle'
                        onClick={() => toggleIsCollapse('favorites')}
                    >
                        <SvgIcon
                            iconName={isFavCollapse ? 'chevronRight' : 'chevronDown'}
                            size={24}
                            colorName={'currentColor'}
                        />
                    </div>

                    <span>Favorites</span>
                </div>

                {!isFavCollapse && <BoardList
                    boards={boards.filter(board => board.isStarred)}
                    onRemoveBoard={onRemoveBoard}
                    onUpdateBoard={onUpdateBoard}
                    isDashboard={false}
                />}
            </div>

            <div className='board-list-container'>
                <div className='board-list-title flex'>

                    <div className='board-list-collapse-toggle'
                        onClick={() => toggleIsCollapse('boards')}
                    >
                        <SvgIcon
                            iconName={isBoardsCollapse ? 'chevronRight' : 'chevronDown'}
                            size={24}
                            colorName={'currentColor'}
                        />
                    </div>

                    <span>All boards</span>
                </div>

                {!isBoardsCollapse && <BoardList
                    boards={boards}
                    onRemoveBoard={onRemoveBoard}
                    onUpdateBoard={onUpdateBoard}
                />}
            </div>


        </section>
    )
}