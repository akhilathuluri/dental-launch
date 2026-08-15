import { jsPDF } from 'jspdf';

export interface BookingPDFData {
  id: string;
  patientName: string;
  whatsapp: string;
  service: string;
  date: string;
  timeSlot: string;
}

export function generateAppointmentPDF(data: BookingPDFData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 20;
  const contentWidth = pageWidth - margin * 2; // 170mm

  // 1. Header Architectural Background
  doc.setFillColor(20, 28, 40); // Dark Navy #141C28
  doc.roundedRect(margin, 20, contentWidth, 38, 4, 4, 'F');

  // Clinic Brand Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('GAHAN DENTAL', margin + 10, 34);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('Premium Architectural Dental Care & Diagnostics', margin + 10, 42);

  // Confirmed Badge in Header (Right aligned)
  doc.setFillColor(16, 185, 129); // Emerald #10B981
  doc.roundedRect(pageWidth - margin - 42, 28, 32, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('CONFIRMED', pageWidth - margin - 26, 33.5, { align: 'center' });

  // 2. Receipt Title & Booking Ref Bar
  let y = 70;
  doc.setTextColor(17, 24, 39); // #111827
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Appointment Confirmation Pass', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, margin, y + 6);

  // Reference Code Box
  doc.setFillColor(241, 245, 249); // Slate-100
  doc.roundedRect(pageWidth - margin - 55, y - 6, 55, 14, 2, 2, 'F');
  doc.setTextColor(88, 122, 156); // Brand Blue #587A9C
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('REF ID:', pageWidth - margin - 50, y + 3);
  doc.setTextColor(17, 24, 39);
  doc.text(data.id, pageWidth - margin - 8, y + 3, { align: 'right' });

  // Divider Line
  y += 18;
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  // 3. Patient Details Card
  y += 10;
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 28, 40);
  doc.text('PATIENT INFORMATION', margin + 8, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Patient Full Name:', margin + 8, y + 17);
  doc.text('WhatsApp Contact:', margin + 8, y + 26);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text(data.patientName, margin + 50, y + 17);
  doc.text(data.whatsapp, margin + 50, y + 26);

  // 4. Appointment Schedule Card (Highlighted)
  y += 42;
  doc.setFillColor(240, 249, 255); // Sky-50
  doc.setDrawColor(186, 230, 253); // Sky-200
  doc.roundedRect(margin, y, contentWidth, 44, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(88, 122, 156);
  doc.text('SCHEDULED VISIT DETAILS', margin + 8, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Treatment / Service:', margin + 8, y + 18);
  doc.text('Appointment Date:', margin + 8, y + 27);
  doc.text('Allocated Time Slot:', margin + 8, y + 36);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text(data.service, margin + 50, y + 18);
  doc.text(data.date, margin + 50, y + 27);
  doc.setTextColor(16, 185, 129); // Emerald time
  doc.text(data.timeSlot, margin + 50, y + 36);

  // 5. Clinic Venue & Check-in Guidelines
  y += 52;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 28, 40);
  doc.text('CLINIC LOCATION & GUIDELINES', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // Slate-600
  const mapsUrl = 'https://maps.google.com/?q=17.4962759058744,78.39706800857294';
  const guidelines = [
    { text: '• Clinic Address: Road No 1, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072', isLink: false },
    { text: `• Google Maps Location: ${mapsUrl}`, isLink: true, url: mapsUrl },
    { text: '• Arrival: Please arrive 10 minutes prior to your allocated slot for initial check-in.', isLink: false },
    { text: '• WhatsApp Support: A digital confirmation ticket has also been sent to your WhatsApp number.', isLink: false },
    { text: '• Zero Waiting Time: Your reserved time slot is guaranteed with no waiting line.', isLink: false },
    { text: '• Assistance: For rescheduling or questions, reach clinic helpline directly.', isLink: false },
  ];

  let guidelineY = y + 6;
  guidelines.forEach((item) => {
    if (item.isLink && item.url) {
      doc.setTextColor(22, 101, 52); // Brand Emerald #166534
      doc.textWithLink(item.text, margin, guidelineY, { url: item.url });
      doc.setTextColor(71, 85, 105); // Reset to slate-600
    } else {
      doc.text(item.text, margin, guidelineY);
    }
    guidelineY += 5.2;
  });

  // 6. Security Watermark & Footer
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, 268, pageWidth - margin, 268);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('© Gahan Dental Clinic • Official Electronic Appointment Receipt • System Verified', margin, 274);
  doc.text('Powered by Gahan Dental Healthcare Systems', pageWidth - margin, 274, { align: 'right' });

  // Trigger browser download
  const safeFilename = `Gahan-Dental-Appointment-${data.id}.pdf`;
  doc.save(safeFilename);
}
