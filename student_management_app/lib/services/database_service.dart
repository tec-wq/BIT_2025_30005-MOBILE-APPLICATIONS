import 'package:firebase_database/firebase_database.dart';
import '../models/student_model.dart';

class DatabaseService {
  // Point the reference to the root of the "students" node in the JSON tree
  final DatabaseReference _dbRef = FirebaseDatabase.instance.ref().child('students');

  /// 1. Save Student Data
  Future<void> saveStudentData(StudentModel student) async {
    try {
      // Use the Auth UID as the key, and save the mapped data under it
      await _dbRef.child(student.uid).set(student.toMap());
    } catch (e) {
      throw Exception('Failed to save student data: $e');
    }
  }

  /// 2. Fetch Real-Time Student Stream
  Stream<List<StudentModel>> getStudents() {
    // Listen to the 'onValue' stream of the Realtime Database
    return _dbRef.onValue.map((event) {
      // The data comes back as a dynamic Map from the Realtime Database
      final data = event.snapshot.value as Map<dynamic, dynamic>?;

      // If the database is completely empty, return an empty list
      if (data == null) {
        return [];
      }

      // Convert the raw data map into a clean list of StudentModels
      return data.entries.map((entry) {
        final key = entry.key as String;
        // Cast the internal data safely to a String/Dynamic map
        final valueMap = Map<String, dynamic>.from(entry.value as Map);

        return StudentModel.fromMap(valueMap, key);
      }).toList();
    });
  }
  /// 3. Delete Student Data
  /// Removes the student node from the Realtime Database using their UID
  Future<void> deleteStudent(String uid) async {
    try {
      await _dbRef.child(uid).remove();
    } catch (e) {
      throw Exception('Failed to delete student: $e');
    }
  }
  /// 4. Update Student Data
  /// Overwrites specific fields for an existing student in the database
  Future<void> updateStudent(StudentModel student) async {
    try {
      await _dbRef.child(student.uid).update(student.toMap());
    } catch (e) {
      throw Exception('Failed to update student: $e');
    }
  }
}