export interface PortfolioProject {
  name: string;
  // Small, compressed copy used for the hover-scroll preview card.
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  // Untouched, full-resolution original — served as-is in the lightbox.
  fullImage: string;
  fullWidth: number;
  fullHeight: number;
  url: string | null;
  // Roughly proportional to how much taller the page is than the preview
  // window, so a quick landing page and a long scrolling page both feel
  // like they're moving at a similar, natural speed on hover.
  durationSeconds: number;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  { name: "Stitch It Quick", thumbnail: "/assets/portfolio/stitch-it-quick.jpg", thumbnailWidth: 1600, thumbnailHeight: 10517, fullImage: "/assets/portfolio-full/stitch-it-quick.png", fullWidth: 2560, fullHeight: 16828, url: "https://stitchitquick.com/", durationSeconds: 9.5 },
  { name: "Discovery Engineering", thumbnail: "/assets/portfolio/discovery-engineering.jpg", thumbnailWidth: 1600, thumbnailHeight: 14530, fullImage: "/assets/portfolio-full/discovery-engineering.png", fullWidth: 2560, fullHeight: 23249, url: "https://discoveryengineering.net/", durationSeconds: 13.4 },
  { name: "SEMS", thumbnail: "/assets/portfolio/terrell-swanson-emergency-medicine.jpg", thumbnailWidth: 1600, thumbnailHeight: 9992, fullImage: "/assets/portfolio-full/terrell-swanson-emergency-medicine.png", fullWidth: 2560, fullHeight: 15987, url: "https://terrellswansonmd.com/", durationSeconds: 9 },
  { name: "Test Drive Tech", thumbnail: "/assets/portfolio/test-drive-tech.jpg", thumbnailWidth: 1600, thumbnailHeight: 11982, fullImage: "/assets/portfolio-full/test-drive-tech.png", fullWidth: 2560, fullHeight: 19171, url: "https://testdrivetech.com/", durationSeconds: 10.9 },
  { name: "SSP Vehicle Litigation Services", thumbnail: "/assets/portfolio/vehicle-inspections-appraisals-expert-witness.jpg", thumbnailWidth: 1600, thumbnailHeight: 9725, fullImage: "/assets/portfolio-full/vehicle-inspections-appraisals-expert-witness.png", fullWidth: 2560, fullHeight: 15561, url: "https://vehicleexpertwitness.net/", durationSeconds: 8.7 },
  { name: "Miranda Mortgage", thumbnail: "/assets/portfolio/miranda-mortgage-denver.jpg", thumbnailWidth: 1600, thumbnailHeight: 6895, fullImage: "/assets/portfolio-full/miranda-mortgage-denver.png", fullWidth: 2560, fullHeight: 11032, url: "https://mirandamortgagedenver.com/", durationSeconds: 6 },
  { name: "Excol", thumbnail: "/assets/portfolio/excol-taxes-bookkeeping.jpg", thumbnailWidth: 1600, thumbnailHeight: 5688, fullImage: "/assets/portfolio-full/excol-taxes-bookkeeping.png", fullWidth: 2560, fullHeight: 9102, url: "https://myexcol.com/", durationSeconds: 4.8 },
  { name: "Injury Consulting", thumbnail: "/assets/portfolio/injury-consulting.jpg", thumbnailWidth: 1600, thumbnailHeight: 9792, fullImage: "/assets/portfolio-full/injury-consulting.png", fullWidth: 2560, fullHeight: 15667, url: "https://injuryconsulting.com/", durationSeconds: 8.8 },
  { name: "Lone Star Ranch Land", thumbnail: "/assets/portfolio/lone-star-ranch-land.jpg", thumbnailWidth: 1600, thumbnailHeight: 9191, fullImage: "/assets/portfolio-full/lone-star-ranch-land.png", fullWidth: 2560, fullHeight: 14706, url: "https://lonestarranchland.com/", durationSeconds: 8.2 },
  { name: "Paint Innovators", thumbnail: "/assets/portfolio/paint-innovators.jpg", thumbnailWidth: 1600, thumbnailHeight: 8730, fullImage: "/assets/portfolio-full/paint-innovators.png", fullWidth: 2560, fullHeight: 13969, url: "https://paintinnovators.com/", durationSeconds: 7.8 },
  { name: "Petrucci Engineering Consultants", thumbnail: "/assets/portfolio/petrucci-engineering-consultants.jpg", thumbnailWidth: 1600, thumbnailHeight: 10287, fullImage: "/assets/portfolio-full/petrucci-engineering-consultants.png", fullWidth: 2560, fullHeight: 16460, url: "https://petrucciengineering.com/", durationSeconds: 9.3 },
  { name: "Prodigy Development Center", thumbnail: "/assets/portfolio/prodigy-development-center.jpg", thumbnailWidth: 1600, thumbnailHeight: 9797, fullImage: "/assets/portfolio-full/prodigy-development-center.png", fullWidth: 2560, fullHeight: 15675, url: "https://prodigydevelopmentcenter.com/", durationSeconds: 8.8 },
  { name: "Snowsports Expert and Consulting", thumbnail: "/assets/portfolio/snowsports-expert-witness.jpg", thumbnailWidth: 1600, thumbnailHeight: 6902, fullImage: "/assets/portfolio-full/snowsports-expert-witness.png", fullWidth: 2560, fullHeight: 11044, url: "https://snowsportsexpert.com/", durationSeconds: 6 },
  { name: "Your Paint Guy", thumbnail: "/assets/portfolio/your-paint-guy.jpg", thumbnailWidth: 1600, thumbnailHeight: 5808, fullImage: "/assets/portfolio-full/your-paint-guy.png", fullWidth: 2560, fullHeight: 9293, url: "https://yourpaintguy.com/", durationSeconds: 4.9 },
  { name: "Classy Nails", thumbnail: "/assets/portfolio/classy-nails.jpg", thumbnailWidth: 1600, thumbnailHeight: 4241, fullImage: "/assets/portfolio-full/classy-nails.png", fullWidth: 2560, fullHeight: 6786, url: "https://classynailscp.com/", durationSeconds: 4 },
];
