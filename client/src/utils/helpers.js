export const calculateGrade = (percentage) => {
  if (percentage >= 85) return 'A+';
  if (percentage >= 75) return 'A';
  if (percentage >= 65) return 'B+';
  if (percentage >= 51) return 'B';
  if (percentage >= 40) return 'C';
  return 'F';
};

export const getGradeColor = (grade) => {
  const colors = {
    'A+': 'text-green-700 bg-green-100',
    'A': 'text-blue-700 bg-blue-100',
    'B+': 'text-purple-700 bg-purple-100',
    'B': 'text-yellow-700 bg-yellow-100',
    'C': 'text-orange-700 bg-orange-100',
    'F': 'text-red-700 bg-red-100',
  };
  return colors[grade] || 'text-gray-700 bg-gray-100';
};

export const DEFAULT_SUBJECTS = [
  { name: 'Basic of Computer & Ms-Office', theoryMarks: 0, practicalMarks: 0, maxTheory: 75, maxPractical: 25 },
  { name: 'PageMaker, Coraldraw, Photoshop', theoryMarks: 0, practicalMarks: 0, maxTheory: 75, maxPractical: 25 },
  { name: 'Tally Prime.', theoryMarks: 0, practicalMarks: 0, maxTheory: 75, maxPractical: 25 },
  { name: 'Internet & Online Working', theoryMarks: 0, practicalMarks: 0, maxTheory: 75, maxPractical: 25 },
];

export const COURSES = [
  'ADVANCE DIPLOMA IN COMPUTER APPLICATION (A.D.C.A.)',
  'DIPLOMA IN COMPUTER APPLICATION (D.C.A.)',
  'BASIC COMPUTER COURSE (B.C.C.)',
  'COMPUTER HARDWARE & NETWORKING',
  'TALLY WITH GST',
  'ENGLISH TYPING COURSE',
  'HINDI TYPING COURSE',
  'SPOKEN ENGLISH COURSE',
];

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
};

export const validateStudentForm = (data) => {
  const errors = {};
  if (!data.studentName?.trim()) errors.studentName = 'Student name is required';
  if (!data.fatherName?.trim()) errors.fatherName = "Father's name is required";
  if (!data.motherName?.trim()) errors.motherName = "Mother's name is required";
  if (!data.registrationNumber?.trim()) errors.registrationNumber = 'Registration number is required';
  if (!data.rollNumber?.trim()) errors.rollNumber = 'Roll number is required';
  if (!data.courseName?.trim()) errors.courseName = 'Course name is required';
  if (!data.sessionFrom?.trim()) errors.sessionFrom = 'Session from is required';
  if (!data.sessionTo?.trim()) errors.sessionTo = 'Session to is required';
  if (!data.issueDate?.trim()) errors.issueDate = 'Issue date is required';

  if (data.subjects && data.subjects.length > 0) {
    data.subjects.forEach((s, i) => {
      if (s.theoryMarks > s.maxTheory) errors[`subject_${i}`] = `Theory marks exceed max for subject ${i + 1}`;
      if (s.practicalMarks > s.maxPractical) errors[`subject_${i}_p`] = `Practical marks exceed max for subject ${i + 1}`;
    });
  }
  return errors;
};
