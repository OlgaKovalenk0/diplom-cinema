import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

export function Layout({ children }: React.PropsWithChildren) {

    const navigate = useNavigate();

    return <div className="container client-layout">
        <div className='header'>
            <div className='logo' onClick={() => navigate(0)}>идём<span>в</span>кино</div>
            <div>
                <Link to="/admin">
                    <button className='button'>Войти</button>
                </Link>
            </div>
        </div>
        {children}
    </div>
}