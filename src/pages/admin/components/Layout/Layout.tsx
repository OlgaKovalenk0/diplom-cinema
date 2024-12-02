import './Layout.css';

export function Layout({ children }: React.PropsWithChildren) {
    return <div className="container admin-layout">
        <div className='header'>
            <div className='logo'>
                идём<span>в</span>кино
                <div>Администраторская</div>
            </div>           
        </div>
        {children}
    </div>
}