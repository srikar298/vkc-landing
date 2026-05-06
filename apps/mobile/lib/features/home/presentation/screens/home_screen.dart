import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHero(),
            _buildAbout(context),
            _buildVision(context),
            _buildFounder(context),
            const SizedBox(height: 32),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text('Join the Community', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                ),
              ),
            ),
            const SizedBox(height: 50),
          ],
        ),
      ),
    );
  }

  Widget _buildHero() {
    return Container(
      height: 300,
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Colors.deepPurple,
        image: DecorationImage(
          image: NetworkImage('https://images.unsplash.com/photo-1519011985187-444d62641929?q=80&w=1000'),
          fit: BoxFit.cover,
          opacity: 0.6,
        ),
      ),
      child: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'VISHWAKARMA',
              style: TextStyle(
                color: Colors.white,
                fontSize: 32,
                fontWeight: FontWeight.black,
                letterSpacing: 4,
              ),
            ),
            Text(
              'Knowledge Centre',
              style: TextStyle(
                color: Colors.white70,
                fontSize: 18,
                letterSpacing: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAbout(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'About the Mission',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 16),
          const Text(
            'The Vishwakarma Knowledge Centre (VKC) is dedicated to the recognition, skill upgradation, and holistic support of traditional artisans.',
            style: TextStyle(fontSize: 16, height: 1.5, color: Colors.black87),
          ),
        ],
      ),
    );
  }

  Widget _buildVision(BuildContext context) {
    return Container(
      color: Colors.grey[100],
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
      child: Column(
        children: [
          _buildVisionCard(
            context,
            Icons.visibility,
            'Recognition',
            'Validating the legacy of our master artisans.',
          ),
          _buildVisionCard(
            context,
            Icons.trending_up,
            'Upgradation',
            'Bridging traditional skills with modern markets.',
          ),
          _buildVisionCard(
            context,
            Icons.handshake,
            'Support',
            'Direct access to toolkits, health, and education.',
          ),
        ],
      ),
    );
  }

  Widget _buildVisionCard(BuildContext context, IconData icon, String title, String desc) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Row(
          children: [
            Icon(icon, color: Colors.deepPurple, size: 32),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                  const SizedBox(height: 4),
                  Text(desc, style: const TextStyle(color: Colors.grey)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFounder(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.deepPurple.withOpacity(0.1)),
          borderRadius: BorderRadius.circular(24),
        ),
        child: const Column(
          children: [
            CircleAvatar(
              radius: 40,
              backgroundImage: NetworkImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000'),
            ),
            SizedBox(height: 16),
            Text(
              'In Memory of the Founder',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Driving the vision of self-reliant craftsmanship.',
              textAlign: TextAlign.center,
              style: TextStyle(fontStyle: FontStyle.italic, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}
