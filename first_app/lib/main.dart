import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

void main() => runApp(const DailyFocusApp());

class DailyFocusApp extends StatelessWidget {
  const DailyFocusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.deepPurple),
      home: const FocusScreen(),
    );
  }
}

class FocusScreen extends StatefulWidget {
  const FocusScreen({super.key});

  @override
  State<FocusScreen> createState() => _FocusScreenState();
}

class _FocusScreenState extends State<FocusScreen> {
  final TextEditingController _t1 = TextEditingController();
  final TextEditingController _t2 = TextEditingController();
  final TextEditingController _t3 = TextEditingController();
  bool _isLocked = false;
  Future<void> _sendGoalsViaSms() async {
    final String message = "My Daily Focus:\n1. ${_t1.text}\n2. ${_t2.text}\n3. ${_t3.text}";
    final Uri smsUri = Uri(
      scheme: 'sms',
      path: 'YOUR_PHONE_NUMBER', // Replace with your actual phone number
      queryParameters: {'body': message},
    );

    if (await canLaunchUrl(smsUri)) {
      await launchUrl(smsUri);
    }
  }

  @override
  void initState() {
    super.initState();
    _loadGoals();
  }

  // Load saved goals from disk
  Future<void> _loadGoals() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _t1.text = prefs.getString('g1') ?? '';
      _t2.text = prefs.getString('g2') ?? '';
      _t3.text = prefs.getString('g3') ?? '';
      _isLocked = prefs.getBool('locked') ?? false;
    });
  }

  // Save goals to disk
  Future<void> _lockGoals() async {
    if (_t1.text.isNotEmpty && _t2.text.isNotEmpty && _t3.text.isNotEmpty) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('g1', _t1.text);
      await prefs.setString('g2', _t2.text);
      await prefs.setString('g3', _t3.text);
      await prefs.setBool('locked', true);
      await _sendGoalsViaSms();
      setState(() => _isLocked = true);
    }
  }

  // Reset for tomorrow
  Future<void> _clearGoals() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    setState(() {
      _t1.clear(); _t2.clear(); _t3.clear();
      _isLocked = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Daily Focus"), actions: [
        if (_isLocked) IconButton(onPressed: _clearGoals, icon: const Icon(Icons.refresh))
      ]),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(controller: _t1, enabled: !_isLocked, decoration: const InputDecoration(labelText: "Goal 1")),
            TextField(controller: _t2, enabled: !_isLocked, decoration: const InputDecoration(labelText: "Goal 2")),
            TextField(controller: _t3, enabled: !_isLocked, decoration: const InputDecoration(labelText: "Goal 3")),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: _isLocked ? null : _lockGoals,
              child: Text(_isLocked ? "Focus Locked" : "Lock in Focus"),
            ),
          ],
        ),
      ),
    );
  }
}