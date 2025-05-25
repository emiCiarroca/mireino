import { useAuth } from '../hooks/useAuth';
import '../styles/admin.css';

const Admin = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <div className="user-info">
          <span>Bienvenido, {user?.name}</span>
          <button onClick={logout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-card">
          <h2>Resumen</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Ventas Hoy</h3>
              <p>$12,450.00</p>
            </div>
            <div className="stat-card">
              <h3>Productos</h3>
              <p>20</p>
            </div>
            <div className="stat-card">
              <h3>Adopciones</h3>
              <p>5</p>
            </div>
            <div className="stat-card">
              <h3>Mensajes</h3>
              <p>3</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <button className="action-button">
              <i className="fas fa-plus"></i>
              <span>Agregar Producto</span>
            </button>
            <button className="action-button">
              <i className="fas fa-edit"></i>
              <span>Editar Productos</span>
            </button>
            <button className="action-button">
              <i className="fas fa-horse"></i>
              <span>Gestionar Equinos</span>
            </button>
            <button className="action-button">
              <i className="fas fa-envelope"></i>
              <span>Ver Mensajes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;