import {Toast, showToast, Clipboard, Icon, Action} from '@raycast/api'
import got from 'got'

export function CreateShortUrlAction() {
    async function handleSubmit(values: {url: string}) {
        if (!values.url) {
            showToast({
                style: Toast.Style.Failure,
                title: 'Url is required',
            })
            return
        }

        const toast = await showToast({
            style: Toast.Style.Animated,
            title: 'Sharing secret',
        })

        try {
            const {body} = await got.post('https://psyho.pw:3000/link', {
                json: {
                    url: values.url,
                },
                responseType: 'json',
            })

            await Clipboard.copy(`http://link.psyho.pw/${(body as any).data.shortId}`)

            toast.style = Toast.Style.Success
            toast.message = 'Copied link to clipboard'
        } catch (error) {
            toast.style = Toast.Style.Failure
            toast.title = 'Failed generating link'
            toast.message = String(error)
        }
    }

    return <Action.SubmitForm icon={Icon.Upload} title="Generate short link" onSubmit={handleSubmit} />
}
