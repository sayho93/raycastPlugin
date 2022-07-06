enum Filter {
    All = 'all',
    Open = 'open',
    Completed = 'completed',
}

interface Todo {
    id: string
    title: string
    isCompleted: boolean
}

interface Timer {
    id: string
    timeStr: string
}

export {Filter}
export type {Todo, Timer}
