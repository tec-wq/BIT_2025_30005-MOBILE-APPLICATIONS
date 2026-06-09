import 'package:flutter/material.dart';
import '../models/student_model.dart';
import '../services/auth_service.dart';
import '../services/database_service.dart';

class DashboardScreen extends StatelessWidget {
  DashboardScreen({super.key});

  final AuthService _authService = AuthService();
  final DatabaseService _dbService = DatabaseService();

  void _logout(BuildContext context) async {
    await _authService.signOut();
    if (context.mounted) {
      Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
    }
  }

  void _showEditDialog(BuildContext context, StudentModel student) {
    final nameController = TextEditingController(text: student.fullName);
    final idController = TextEditingController(text: student.studentId);
    final courseController = TextEditingController(text: student.course);
    final yearController = TextEditingController(text: student.yearOfStudy); // NEW
    final phoneController = TextEditingController(text: student.phoneNumber); // NEW

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit Student Profile'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: nameController, decoration: const InputDecoration(labelText: 'Full Name')),
              const SizedBox(height: 8),
              TextField(controller: idController, decoration: const InputDecoration(labelText: 'Student ID')),
              const SizedBox(height: 8),
              TextField(controller: courseController, decoration: const InputDecoration(labelText: 'Course')),
              const SizedBox(height: 8),
              TextField(controller: yearController, decoration: const InputDecoration(labelText: 'Year of Study'), keyboardType: TextInputType.number), // NEW
              const SizedBox(height: 8),
              TextField(controller: phoneController, decoration: const InputDecoration(labelText: 'Phone Number'), keyboardType: TextInputType.phone), // NEW
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('CANCEL')),
          ElevatedButton(
            onPressed: () async {
              final updatedStudent = StudentModel(
                uid: student.uid,
                email: student.email,
                fullName: nameController.text.trim(),
                studentId: idController.text.trim(),
                course: courseController.text.trim(),
                yearOfStudy: yearController.text.trim(), // NEW
                phoneNumber: phoneController.text.trim(), // NEW
              );

              await _dbService.updateStudent(updatedStudent);

              if (context.mounted) {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('${updatedStudent.fullName} updated!')),
                );
              }
            },
            child: const Text('SAVE CHANGES'),
          ),
        ],
      ),
    );
  }

  void _confirmDelete(BuildContext context, StudentModel student) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Student?'),
        content: Text('Are you sure you want to permanently remove ${student.fullName}?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('CANCEL')),
          TextButton(
            onPressed: () async {
              Navigator.pop(context);
              await _dbService.deleteStudent(student.uid);
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${student.fullName} deleted')));
              }
            },
            child: const Text('DELETE', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Directory'),
        actions: [IconButton(icon: const Icon(Icons.logout), tooltip: 'Log Out', onPressed: () => _logout(context))],
      ),
      body: StreamBuilder<List<StudentModel>>(
        stream: _dbService.getStudents(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) return const Center(child: CircularProgressIndicator());
          if (snapshot.hasError) return Center(child: Text('Error: \n${snapshot.error}', style: const TextStyle(color: Colors.red)));
          if (!snapshot.hasData || snapshot.data!.isEmpty) return const Center(child: Text('No students registered yet.\nClick + to add one.'));

          final students = snapshot.data!;

          return ListView.builder(
            itemCount: students.length,
            padding: const EdgeInsets.only(bottom: 80),
            itemBuilder: (context, index) {
              final student = students[index];

              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                elevation: 2,
                child: ListTile(
                  isThreeLine: true, // Allows the subtitle to take up more space cleanly
                  leading: CircleAvatar(
                    backgroundColor: Colors.blueAccent,
                    child: Text(
                      student.fullName.isNotEmpty ? student.fullName[0].toUpperCase() : '?',
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                  title: Text(student.fullName, style: const TextStyle(fontWeight: FontWeight.bold)),
                  // NEW: Updated Subtitle to display the new info
                  subtitle: Text('${student.course} (Year ${student.yearOfStudy})\nID: ${student.studentId} • Ph: ${student.phoneNumber}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(icon: const Icon(Icons.edit, color: Colors.blue), onPressed: () => _showEditDialog(context, student)),
                      IconButton(icon: const Icon(Icons.delete_outline, color: Colors.red), onPressed: () => _confirmDelete(context, student)),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/register'),
        backgroundColor: Colors.blueAccent,
        foregroundColor: Colors.white,
        child: const Icon(Icons.add),
      ),
    );
  }
}