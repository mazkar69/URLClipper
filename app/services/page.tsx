import { Check, Star, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional URL shortening services designed for individuals, businesses, and organizations of all sizes.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Service */}
            <Card className="relative">
              <CardHeader>
                <Badge className="w-fit mb-2">Free</Badge>
                <CardTitle className="text-2xl">Basic Shortening</CardTitle>
                <CardDescription>Perfect for personal use and small projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Unlimited URL shortening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Basic click analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">No advertisements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Dashboard management</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Service */}
            <Card className="relative border-blue-200 bg-blue-50">
              <CardHeader>
                <Badge variant="default" className="w-fit mb-2">
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
                <CardTitle className="text-2xl">Advanced Features</CardTitle>
                <CardDescription>Enhanced functionality for power users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Everything in Basic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom expiration times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Scheduled activation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Detailed analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Bulk operations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Service */}
            <Card className="relative">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  <Zap className="h-3 w-3 mr-1" />
                  Enterprise
                </Badge>
                <CardTitle className="text-2xl">Business Solutions</CardTitle>
                <CardDescription>Scalable solutions for large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Everything in Premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom domain support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Team management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose URLCliper?</h2>
            <p className="text-lg text-gray-600">We offer more than just URL shortening</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Time-Based Controls</h3>
              <p className="text-gray-600">
                Set when your links become active and when they expire. Perfect for time-sensitive campaigns and
                scheduled releases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Clean Analytics</h3>
              <p className="text-gray-600">
                Track clicks and performance without overwhelming complexity. Get the insights you need in a clean,
                easy-to-understand format.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">No Ads, Ever</h3>
              <p className="text-gray-600">
                Your shortened URLs will never show advertisements. Keep your professional image intact with clean,
                direct redirects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Reliable Infrastructure</h3>
              <p className="text-gray-600">
                Built on robust infrastructure to ensure your links work when you need them most. High uptime and fast
                redirects guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
