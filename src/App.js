import React, { useState } from 'react';
import './App.css';
import logo1 from './components/logo1.jpeg';
import fotok from './components/fotok.jpeg';
import fotop from './components/fotop.jpeg';
import fotoE from './components/fotoE.jpg';
import fotoS from './components/fotoS.jpeg';
import services from './components/services.png';
import analisis from './components/analisis.jpg';
import automatizacion from './components/automatizacion.jpg';
import comunicacion from './components/comunicacion.jpg';

const TeamMemberCard = ({ name, role, image, onClick }) => {
  return (
    <div className="team-member-card" onClick={onClick}>
      <img src={image} alt={name} className="team-member-image" />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
};

const HomeView = ({ onCardClick }) => {
  return (
    <div>
      <h1 className="home-title">EDUCATIONAL HARMONIE</h1>
      <p>A platform focused on disciplinary processes in institutions.</p>
      <div className="team-container">
        <TeamMemberCard
          name="About Us"
          role="Learn more about us"
          image={logo1} 
          onClick={() => onCardClick({ view: 'about' })}
        />
        <TeamMemberCard
          name="Our Team"
          role="Meet our team"
          image={fotoS} 
          onClick={() => onCardClick({ view: 'team' })}
        />
        <TeamMemberCard
          name="Services"
          role="Discover our services"
          image={services} 
          onClick={() => onCardClick({ view: 'services' })}
        />
      </div>
    </div>
  );
};

const AboutView = ({ selectedMember }) => {
  if (!selectedMember) return null; 

  return (
    <div>
      <h1 className="about-title">ABOUT US</h1>
      <img src={selectedMember.image} alt={selectedMember.name} className="team-member-image" />
      <h2>{selectedMember.name}</h2>
      <p>{selectedMember.role}</p>
      <p>{selectedMember.bio}</p>
    </div>
  );
};

const ServicesView = () => {
  const services = [
    {
      title: 'Automation in Reports',
      description: 'We implement solutions that automate the generation of reports, saving time and resources.',
      image: automatizacion, 
    },
    {
      title: 'Communication with Clients',
      description: 'Automatic notification of reports to guardians.',
      image: comunicacion, 
    },
    {
      title: 'Statistics Generation',
      description: 'Graphic reports on disciplinary trends by course, students or gender.',
      image: analisis, 
    },
  ];

  const [openService, setOpenService] = useState(null);

  const handleServiceClick = (index) => {
    setOpenService(openService === index ? null : index);
  };

  return (
    <div>
      <h1 className="services-title">Services & Products</h1>
      <div className="team-container">
        {services.map((service, index) => (
          <TeamMemberCard
            key={index}
            name={service.title}
            role={openService === index ? service.description : 'más información'}
            image={service.image} 
            onClick={() => handleServiceClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Team = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMember, setSelectedMember] = useState(null); 

  const teamMembers = [
    {
      name: 'Sileny Dueñas',
      role: 'Backend-Frontend Developer',
      image: fotoS,
      bio: 'Sileny is a passionate frontend developer. He loves creating attractive and easy-to-use websites.',
    },
    {
      name: 'Keyla Rodriguez',
      role: 'Data analyst',
      image: fotok,
      bio: 'Keyla is a skilled data analyst with expertise in extracting insights from complex datasets.',
    },
    {
      name: 'Pablo Olmos',
      role: 'Frontend Developer',
      image: fotop,
      bio: 'Pablo is a talented frontend developer with a keen eye for design and user experience.',
    },
    {
      image: fotoE,
      name: 'Emmanuel Castilla',
      role: 'Database administrator',
      bio: 'Emmanuel is an experienced database administrator who ensures data integrity and security.',
    },
  ];

  const handleCardClick = (member) => {
    if (member.view === 'about') {
      setCurrentView('about');
    } else if (member.view === 'team') {
      setCurrentView('team');
    } else if (member.view === 'services') {
      setCurrentView('services');
    } else {
      setSelectedMember(member); 
      setCurrentView('about'); 
    }
  };

  const renderView = () => {
    if (currentView === 'home') {
      return <HomeView onCardClick={handleCardClick} />;
    } else if (currentView === 'about') {
      return <AboutView selectedMember={selectedMember} />;
    } else if (currentView === 'team') {
      return (
        <div className="team-container">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              onClick={() => handleCardClick(member)} 
            />
          ))}
        </div>
      );
    } else if (currentView === 'services') {
      return <ServicesView />;
    }
    return null;
  };

  return (
    <div className="app-container">
      <header className="header">
        <img src={logo1} alt="Logo" className="logo" />
        <nav className="navbar">
          <ul>
            <li onClick={() => setCurrentView('home')}>Home</li>
            <li onClick={() => setCurrentView('about')}>About Us</li>
            <li onClick={() => setCurrentView('team')}>Our Team</li>
            <li onClick={() => setCurrentView('services')}>Services & Products</li>
          </ul>
        </nav>
      </header>
      <div className="content">
        {renderView()}
      </div>
    </div>
  );
};

export default Team;