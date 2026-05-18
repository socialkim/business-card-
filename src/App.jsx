import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FaLinkedin, 
  FaYoutube, 
  FaInstagram, 
  FaFacebook, 
  FaGithub 
} from 'react-icons/fa';
import { 
  MdEmail, 
  MdPhone, 
  MdLanguage, 
  MdFileDownload 
} from 'react-icons/md';
import { generateVCard } from './utils/vcard';
import './index.css';

function App() {
  const contactInfo = {
    firstName: 'Dukjin',
    lastName: 'Kim',
    fullName: 'Kim Dukjin (김덕진 소장)',
    title: 'Director / CEO',
    organization: 'IT Communication Research Lab',
    email: 'kimdukjin@itcl.kr',
    phone: '+82-10-2936-3349',
    url: 'http://itcl.kr/',
    youtube: 'https://www.youtube.com/@aidia-v5w',
    linkedin: 'https://www.linkedin.com/in/kimdukjin/',
    instagram: 'https://www.instagram.com/kim_dukjin/',
    facebook: 'https://www.facebook.com/DavidKim0211',
    github: 'https://github.com/socialkim/'
  };

  const vCardString = generateVCard(contactInfo);

  const handleDownload = () => {
    const blob = new Blob([vCardString], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.firstName}_${contactInfo.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const links = [
    { name: 'Email', icon: <MdEmail />, url: `mailto:${contactInfo.email}` },
    { name: 'Website', icon: <MdLanguage />, url: contactInfo.url },
    { name: 'YouTube', icon: <FaYoutube />, url: contactInfo.youtube },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: contactInfo.linkedin },
    { name: 'Instagram', icon: <FaInstagram />, url: contactInfo.instagram },
    { name: 'Facebook', icon: <FaFacebook />, url: contactInfo.facebook },
    { name: 'GitHub', icon: <FaGithub />, url: contactInfo.github },
    { name: 'Call', icon: <MdPhone />, url: `tel:${contactInfo.phone}` }
  ];

  return (
    <div className="glass-container">
      <div className="content-z">
        
        {/* Profile Section */}
        <div className="profile-img-container">
          <div className="profile-img">KD</div>
        </div>
        
        <h1 className="name">{contactInfo.fullName}</h1>
        <h2 className="title">{contactInfo.title} · IT Communication Research Lab</h2>
        <h3 className="subtitle">세종사이버대학교 컴퓨터AI공학과 교수</h3>

        {/* Links Grid */}
        <div className="links-grid">
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="link-btn">
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* QR Code Section */}
        <div className="qr-section">
          <h3 className="qr-title">Scan to Save Contact</h3>
          <p className="qr-desc">카메라로 스캔하여 연락처를 추가하세요</p>
          <div className="qr-wrapper">
            <QRCodeSVG 
              value={vCardString} 
              size={180} 
              bgColor={"#ffffff"}
              fgColor={"#0f172a"}
              level={"M"}
              includeMargin={false}
            />
          </div>
        </div>

        {/* Download Fallback */}
        <button onClick={handleDownload} className="primary-btn">
          <MdFileDownload size={20} />
          <span>vCard 다운로드</span>
        </button>

      </div>
    </div>
  );
}

export default App;
