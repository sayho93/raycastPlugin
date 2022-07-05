import {Action, Icon} from '@raycast/api'

function DeleteTodoAction(props: {onDelete: () => void}) {
    return <Action icon={Icon.Trash} title="Delete Todo" shortcut={{modifiers: ['ctrl'], key: 'x'}} onAction={props.onDelete} />
}

export default DeleteTodoAction
