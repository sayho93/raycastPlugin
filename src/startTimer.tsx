import {Form, ActionPanel} from '@raycast/api'
import {CreateNewTimer} from './components/horoTimer/createNewTimer'

export default function Command() {
    return (
        <Form
            actions={
                <ActionPanel>
                    <CreateNewTimer />
                </ActionPanel>
            }
        >
            <Form.TextArea id="timeStr" title="Time" placeholder="45m" />
        </Form>
    )
}
