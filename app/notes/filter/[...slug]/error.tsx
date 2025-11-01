'use client'

interface Props {
    error: Error
}

const Error = ({ error }: Props) => {
    return error.message
}

export default Error