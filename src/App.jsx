import React, { useState } from 'react';
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
  const [lang, setLang] = useState('ko');

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

  const content = {
    ko: {
      name: '김덕진 소장',
      title: 'Director / CEO · IT Communication Research Lab',
      subtitle: '세종사이버대학교 컴퓨터AI공학과 교수',
      qrTitle: '연락처 저장하기',
      qrDesc: '카메라 앱으로 스캔하여 연락처를 추가하세요',
      downloadBtn: 'vCard 다운로드',
      toggleBtn: 'EN',
      links: {
        Email: '이메일',
        Website: '웹사이트',
        Call: '전화'
      }
    },
    en: {
      name: 'Kim Dukjin',
      title: 'Director / CEO · IT Communication Research Lab',
      subtitle: 'Professor, Dept. of Computer & AI, Sejong Cyber Univ.',
      qrTitle: 'Scan to Save Contact',
      qrDesc: 'Scan with your camera app to save contact',
      downloadBtn: 'Download vCard',
      toggleBtn: 'KR',
      links: {
        Email: 'Email',
        Website: 'Website',
        Call: 'Call'
      }
    }
  };

  const t = content[lang];

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

  const toggleLang = () => {
    setLang(lang === 'ko' ? 'en' : 'ko');
  };

  const links = [
    { name: t.links.Email, icon: <MdEmail />, url: `mailto:${contactInfo.email}` },
    { name: t.links.Website, icon: <MdLanguage />, url: contactInfo.url },
    { name: 'YouTube', icon: <FaYoutube />, url: contactInfo.youtube },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: contactInfo.linkedin },
    { name: 'Instagram', icon: <FaInstagram />, url: contactInfo.instagram },
    { name: 'Facebook', icon: <FaFacebook />, url: contactInfo.facebook },
    { name: 'GitHub', icon: <FaGithub />, url: contactInfo.github },
    { name: t.links.Call, icon: <MdPhone />, url: `tel:${contactInfo.phone}` }
  ];

  return (
    <div className="glass-container">
      <button className="lang-toggle" onClick={toggleLang}>
        {t.toggleBtn}
      </button>

      <div className="content-z">
        
        {/* Profile Section */}
        <div className="profile-img-container">
          <div className="profile-img">KD</div>
        </div>
        
        <h1 className="name">{t.name}</h1>
        <h2 className="title">{t.title}</h2>
        <h3 className="subtitle">{t.subtitle}</h3>

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
          <h3 className="qr-title">{t.qrTitle}</h3>
          <p className="qr-desc">{t.qrDesc}</p>
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
          <span>{t.downloadBtn}</span>
        </button>

      </div>
    </div>
  );
}

export default App;
