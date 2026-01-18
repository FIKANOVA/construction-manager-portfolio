export const metadata = {
    title: 'Sanity Studio',
    description: 'Backend management for VUYOPHOTO',
}

export default function CleanLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    )
}
