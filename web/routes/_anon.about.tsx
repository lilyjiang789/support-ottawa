import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";

export default function () {
  return (
    <div className="flex flex-col h-screen w-full">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="pl-[350px] max-w-6xl mx-auto">
            <div className="py-8">
              <h1 className="text-5xl font-bold text-left leading-tight mb-4">
                About Us
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Learn more about our mission, initiatives, and how you can help make a difference.
              </p>
            </div>

            {/* Our Mission Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="">
                      <p className="text-lg mb-4">
                        At Ottawa Support Community, our mission is to bridge the gap between homelessness and available resources by leveraging technology to create a more efficient, transparent, and community-driven support system. We believe that everyone deserves access to shelter, food, and assistance, and we strive to ensure that help reaches those who need it most.
                      </p>
                      <p className="text-lg">
                        We achieve our mission through a collaborative, data-driven approach that connects homeless individuals, shelters, volunteers, and kind-hearted community members.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Our Initiatives Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Initiatives</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Smart Shelter Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our platform maps homeless individuals to available shelter spaces, ensuring fair distribution and reducing overcrowding.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Smart Food Bank Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our platform maps homeless individuals to available food bank spaces, ensuring fair distribution and reducing uneven resources.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Real-Time Shelter Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Shelter managers can update availability and status in real-time, making sure no bed goes unused.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Community Engagement & Assistance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      We empower kind-hearted individuals to announce charitable acts, such as meal distributions, clothing drives, or free services.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Partnerships with Local Organizations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      We collaborate with food banks, shelters, and outreach programs to enhance support and ensure sustainable aid.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Volunteer & Donation Hub</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      People can sign up to volunteer, donate items, or offer services, making it easier to contribute in a meaningful way.
                    </p>
                  </CardContent>
                  </Card>
              </div>
            </section>

            {/* Why It Matters Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>
              <Card className="border-0 bg-slate-50 shadow-sm">
                <CardContent className="p-8">
                  <p className="mb-4">
                    Homelessness is a complex issue, but small, coordinated actions can make a huge impact. By providing a centralized, easy-to-use platform, we empower shelters, volunteers, and those experiencing homelessness to connect efficiently, ensuring that no one is left behind.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Join Us Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Join Us</h2>
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold mb-4">Be Part of the Solution</h3>
                      <p className="text-lg mb-6">
                        Whether you're a business with surplus food, a volunteer with time to give, 
                        or a donor looking to support our cause, there's a place for you in our community.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                          <Link to="/donate">Donate Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          <Link to="/volunteer">Volunteer</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          <Link to="/partner">Partner With Us</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/3 bg-white rounded-xl shadow-inner p-6">
                      <h4 className="font-semibold text-xl mb-4">Contact Us</h4>
                      <div className="space-y-3">
                        <p><span className="font-medium">Email:</span> info@supportOttawa.ca</p>
                        <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
                        <p><span className="font-medium">Address:</span> 123 Main Street, Anytown, USA</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
    </div>
  );
}
