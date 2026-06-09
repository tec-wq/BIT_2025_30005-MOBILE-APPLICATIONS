class StudentModel {
  final String uid;
  final String fullName;
  final String studentId;
  final String course;
  final String email;
  final String yearOfStudy; // NEW
  final String phoneNumber; // NEW

  StudentModel({
    required this.uid,
    required this.fullName,
    required this.studentId,
    required this.course,
    required this.email,
    required this.yearOfStudy, // NEW
    required this.phoneNumber, // NEW
  });

  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'fullName': fullName,
      'studentId': studentId,
      'course': course,
      'email': email,
      'yearOfStudy': yearOfStudy, // NEW
      'phoneNumber': phoneNumber, // NEW
    };
  }

  factory StudentModel.fromMap(Map<String, dynamic> map, String documentId) {
    return StudentModel(
      uid: documentId,
      fullName: map['fullName'] ?? 'Unknown Name',
      studentId: map['studentId'] ?? 'Unknown ID',
      course: map['course'] ?? 'Undeclared',
      email: map['email'] ?? 'No Email',
      yearOfStudy: map['yearOfStudy'] ?? 'N/A', // NEW (Fallback for old records)
      phoneNumber: map['phoneNumber'] ?? 'No Phone', // NEW (Fallback for old records)
    );
  }
}