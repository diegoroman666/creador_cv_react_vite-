import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import './App.css'; // Tus estilos personalizados

function App() {
  // Estado para la información personal
  const [nombre, setNombre] = useState('Tu Nombre Completo');
  const [tituloProfesional, setTituloProfesional] = useState('Desarrollador de Software | Especialista en [Tu Campo]');
  const [email, setEmail] = useState('tu.email@example.com');
  const [telefono, setTelefono] = useState('+123 456 7890');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/tunombredeusuario');
  const [github, setGithub] = useState('https://github.com/tuusuariondegit');

  // Estado para la sección "Sobre Mí"
  const [sobreMi, setSobreMi] = useState(
    'Soy un desarrollador de software apasionado con [Número] años de experiencia en [Tecnologías principales, ej., desarrollo web full-stack, backend con Node.js, ciencia de datos]. Mi enfoque principal es crear soluciones eficientes, escalables y fáciles de usar. Me encanta aprender nuevas tecnologías, enfrentar desafíos complejos y contribuir a proyectos significativos. Estoy buscando una oportunidad donde pueda aplicar mis habilidades y seguir creciendo profesionalmente.'
  );

  // Estado para la educación (un array de objetos para manejar múltiples entradas)
  const [educacion, setEducacion] = useState([
    {
      id: 1,
      titulo: 'Título de Grado/Licenciatura en [Tu Carrera]',
      institucion: 'Nombre de la Universidad/Institución | Ciudad, País | Año de Inicio - Año de Fin',
      descripcion: 'Mención especial si aplica (ej. *Summa Cum Laude*), proyectos relevantes, o asignaturas destacadas.'
    },
    {
      id: 2,
      titulo: 'Diploma/Certificación en [Área de Estudio]',
      institucion: 'Nombre de la Institución/Plataforma | Año de Finalización',
      descripcion: 'Descripción breve del contenido o habilidades adquiridas.'
    }
  ]);

  // Estado para las habilidades (cadenas de texto separadas por comas para simplificar la edición)
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState(
    'JavaScript (ES6+), Python, Java, C#, React.js, Node.js, Express.js, Django, Flask, MongoDB, PostgreSQL, MySQL, Git, Docker, Kubernetes, AWS, GCP'
  );
  const [habilidadesBlandas, setHabilidadesBlandas] = useState(
    'Resolución de Problemas, Comunicación Efectiva, Trabajo en Equipo y Colaboración, Pensamiento Crítico, Adaptabilidad y Aprendizaje Continuo, Gestión del Tiempo'
  );

  // Estado para la experiencia profesional (un array de objetos para manejar múltiples entradas)
  const [experiencia, setExperiencia] = useState([
    {
      id: 1,
      puesto: 'Puesto de Trabajo (Ej. Desarrollador Full-Stack)',
      empresa: 'Nombre de la Empresa | Ciudad, País | Fecha de Inicio - Fecha de Fin',
      responsabilidades: [
        'Diseñé y desarrollé [nombre de la característica/módulo] utilizando [tecnologías usadas], mejorando [métrica o beneficio, ej. la eficiencia en un 15%].',
        'Colaboré con equipos multifuncionales en [tipo de proyecto] para implementar [solución específica].',
        'Optimicé el rendimiento de [parte del sistema] reduciendo el tiempo de carga en [X] segundos.',
        'Participé en todo el ciclo de vida de desarrollo de software, desde la planificación hasta el despliegue y mantenimiento.'
      ].join('\n') // Unimos las responsabilidades con saltos de línea para que se editen como un solo texto grande
    },
    {
      id: 2,
      puesto: 'Puesto de Trabajo Anterior (Ej. Desarrollador Junior)',
      empresa: 'Nombre de la Empresa | Ciudad, País | Fecha de Inicio - Fecha de Fin',
      responsabilidades: [
        'Asistí en el desarrollo y mantenimiento de [nombre de la aplicación] usando [tecnologías].',
        'Realicé pruebas y depuración de código para asegurar la funcionalidad y estabilidad.',
        'Aprendí y apliqué buenas prácticas de codificación y control de versiones con Git.'
      ].join('\n') // Unimos las responsabilidades con saltos de línea
    }
  ]);

  // Estado para el pie de página
  const [footerText, setFooterText] = useState(`© ${new Date().getFullYear()} Tu Nombre Completo. Todos los derechos reservados.`);

  // Función para manejar la descarga del PDF
  const handleDownloadPDF = () => {
    // Esconder el botón de descarga y otros elementos de edición antes de generar el PDF
    const downloadButton = document.getElementById('download-btn');
    if (downloadButton) downloadButton.style.display = 'none';

    // Opcional: Esconder otros elementos de formulario o edición
    const editElements = document.querySelectorAll('.editable-field');
    editElements.forEach(el => el.style.display = 'none');
    
    const cvContent = document.getElementById('cv-content'); // Obtén el elemento que contiene todo el CV
    
    // Opciones de configuración para html2pdf
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // Top, Left, Bottom, Right
      filename: `${nombre.replace(/\s/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(cvContent).save().then(() => {
        // Mostrar de nuevo el botón de descarga y los elementos de edición después de generar el PDF
        if (downloadButton) downloadButton.style.display = 'block';
        editElements.forEach(el => el.style.display = 'block');
    });
  };

  // Función genérica para manejar cambios en campos de educación
  const handleEducacionChange = (index, field, value) => {
    const newEducacion = [...educacion];
    newEducacion[index][field] = value;
    setEducacion(newEducacion);
  };

  // Función genérica para manejar cambios en campos de experiencia
  const handleExperienciaChange = (index, field, value) => {
    const newExperiencia = [...experiencia];
    newExperiencia[index][field] = value;
    setExperiencia(newExperiencia);
  };


  return (
    // MODIFICADO: Envuelve todo el contenido del CV con un div con id="cv-content"
    <div className="cv-wrapper">
       {/* NUEVO: Título y Subtítulo del Proyecto */}
      <div className="project-header text-center mb-4">
        <h1 className="display-4 text-primary">Creador de CV Interactivo</h1>
        <p className="lead text-secondary">Crea, Edita y Descarga tu Curriculum Vitae al instante</p>
      </div>
      <Container className="my-4">
        {/* Botón de descarga fuera del área de contenido del CV para que no aparezca en el PDF */}
        <div className="d-flex justify-content-center mb-3">
          <Button id="download-btn" variant="primary" onClick={handleDownloadPDF}>
            Descargar CV (PDF)
          </Button>
        </div>
      </Container>

      <div id="cv-content" className="cv-container"> {/* Este div será el que se convierta en PDF */}
        {/* Sección de Encabezado */}
        <header className="text-center mb-5">
          {/* MODIFICADO: Campos editables para nombre y título profesional */}
          <Form.Control
            as="textarea" // Usar textarea para que pueda ser más de una línea si es necesario
            rows={1}
            className="text-center h1-input mb-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Form.Control
            as="textarea"
            rows={1}
            className="text-center lead-input mb-3"
            value={tituloProfesional}
            onChange={(e) => setTituloProfesional(e.target.value)}
          />
          <p className="contact-info">
            <Form.Control
              type="email"
              className="d-inline-block w-auto mx-2 text-center contact-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> |
            <Form.Control
              type="tel"
              className="d-inline-block w-auto mx-2 text-center contact-input"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            /> |
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none mx-2">
              <Form.Control
                type="text"
                className="d-inline-block w-auto text-center contact-input"
                value={linkedin.replace('https://linkedin.com/in/', 'LinkedIn: ')} // Muestra solo el usuario para más limpieza
                onChange={(e) => setLinkedin(e.target.value.replace('LinkedIn: ', 'https://linkedin.com/in/'))}
              />
            </a> |
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-decoration-none mx-2">
              <Form.Control
                type="text"
                className="d-inline-block w-auto text-center contact-input"
                value={github.replace('https://github.com/', 'GitHub: ')} // Muestra solo el usuario
                onChange={(e) => setGithub(e.target.value.replace('GitHub: ', 'https://github.com/'))}
              />
            </a>
          </p>
        </header>

        {/* Sección "Sobre Mí" */}
        <section id="profile" className="mb-5">
          <h2>Sobre Mí</h2>
          <hr />
          {/* MODIFICADO: Área de texto editable para "Sobre Mí" */}
          <Form.Control
            as="textarea"
            rows={6} // Ajusta el número de filas según sea necesario
            value={sobreMi}
            onChange={(e) => setSobreMi(e.target.value)}
            className="editable-textarea"
          />
        </section>

        {/* Sección de Educación */}
        <section id="education" className="mb-5">
          <h2>Educación</h2>
          <hr />
          <Row>
            <Col md={12}>
              {/* MODIFICADO: Mapea y renderiza cada entrada de educación */}
              {educacion.map((edu, index) => (
                <Card className="mb-3" key={edu.id}>
                  <Card.Body>
                    <Form.Control
                      type="text"
                      className="card-title-input mb-2"
                      value={edu.titulo}
                      onChange={(e) => handleEducacionChange(index, 'titulo', e.target.value)}
                    />
                    <Form.Control
                      type="text"
                      className="card-subtitle-input mb-2 text-muted"
                      value={edu.institucion}
                      onChange={(e) => handleEducacionChange(index, 'institucion', e.target.value)}
                    />
                    <Form.Control
                      as="textarea"
                      rows={2}
                      className="card-text-input"
                      value={edu.descripcion}
                      onChange={(e) => handleEducacionChange(index, 'descripcion', e.target.value)}
                    />
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </section>

        {/* Sección de Habilidades */}
        <section id="skills" className="mb-5">
          <h2>Habilidades</h2>
          <hr />
          <Row>
            <Col md={6}>
              <h3>Habilidades Técnicas</h3>
              {/* MODIFICADO: Área de texto editable para Habilidades Técnicas */}
              <Form.Control
                as="textarea"
                rows={8}
                value={habilidadesTecnicas}
                onChange={(e) => setHabilidadesTecnicas(e.target.value)}
                className="editable-textarea"
              />
            </Col>
            <Col md={6}>
              <h3>Habilidades Blandas</h3>
              {/* MODIFICADO: Área de texto editable para Habilidades Blandas */}
              <Form.Control
                as="textarea"
                rows={8}
                value={habilidadesBlandas}
                onChange={(e) => setHabilidadesBlandas(e.target.value)}
                className="editable-textarea"
              />
            </Col>
          </Row>
        </section>

        {/* Sección de Experiencia Profesional */}
        <section id="experience" className="mb-5">
          <h2>Experiencia Profesional</h2>
          <hr />
          <Row>
            <Col md={12}>
              {/* MODIFICADO: Mapea y renderiza cada entrada de experiencia */}
              {experiencia.map((exp, index) => (
                <Card className="mb-3" key={exp.id}>
                  <Card.Body>
                    <Form.Control
                      type="text"
                      className="card-title-input mb-2"
                      value={exp.puesto}
                      onChange={(e) => handleExperienciaChange(index, 'puesto', e.target.value)}
                    />
                    <Form.Control
                      type="text"
                      className="card-subtitle-input mb-2 text-muted"
                      value={exp.empresa}
                      onChange={(e) => handleExperienciaChange(index, 'empresa', e.target.value)}
                    />
                    <Form.Control
                      as="textarea"
                      rows={6} // Ajusta el número de filas según el contenido
                      className="card-text-input"
                      value={exp.responsabilidades}
                      onChange={(e) => handleExperienciaChange(index, 'responsabilidades', e.target.value)}
                    />
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </section>

        {/* Pie de Página */}
        <footer className="text-center mt-5 py-3 border-top">
          {/* MODIFICADO: Área de texto editable para el pie de página */}
          <Form.Control
            as="textarea"
            rows={1}
            className="text-center footer-input"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
          />
        </footer>
      </div> {/* Fin de cv-content */}
    </div>
  );
}

export default App;