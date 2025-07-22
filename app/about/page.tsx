import { Shield, Clock, BarChart3, Users, Zap, Lock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About URLCliper</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building the future of URL shortening with a focus on simplicity, reliability, and user experience. No
            ads, no tracking, just clean short links.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To provide a clean, fast, and reliable URL shortening service that respects user privacy and delivers
              professional results without the clutter of advertisements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ad-Free Experience</h3>
              <p className="text-gray-600">No advertisements, no distractions. Just clean, professional short links.</p>
            </div>

            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Time Controls</h3>
              <p className="text-gray-600">Set custom start and expiration times for your shortened URLs.</p>
            </div>

            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Track clicks and manage all your URLs from a personalized dashboard.</p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Focused</h3>
              <p className="text-gray-600">Built with user experience in mind, from signup to link management.</p>
            </div>

            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed with instant redirects and minimal latency.</p>
            </div>

            <div className="text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is protected with industry-standard security measures.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Simplicity First</h3>
              <p className="text-gray-600">
                We believe in keeping things simple. Our interface is clean, intuitive, and focused on what matters most
                - shortening your URLs quickly and efficiently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Privacy Respect</h3>
              <p className="text-gray-600">
                We don't track your browsing habits or sell your data. Your shortened URLs and click analytics are yours
                alone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-gray-600">
                Your short links should work when you need them. We maintain high uptime and fast response times to
                ensure your links are always accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
