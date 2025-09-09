import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { motion } from 'motion/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'
import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Activity,
  Bug,
  Sprout,
  Calendar,
  Target,
  Zap,
  CloudRain
} from 'lucide-react'

interface FieldData {
  id: string
  name: string
  area: number
  cropType: string
  health: number
  moisture: number
  temperature: number
  ph: number
  nutrients: {
    nitrogen: number
    phosphorus: number
    potassium: number
  }
  plantingDate: string
  expectedHarvest: string
  yieldPrediction: number
  pestRisk: 'Low' | 'Medium' | 'High'
  irrigationStatus: 'Active' | 'Scheduled' | 'Manual'
}

interface FieldDetailsModalProps {
  field: FieldData | null
  isOpen: boolean
  onClose: () => void
}

export function FieldDetailsModal({ field, isOpen, onClose }: FieldDetailsModalProps) {
  if (!field) return null

  // Mock detailed sensor data for the selected field
  const hourlyData = [
    { time: '00:00', temperature: 18, moisture: 65, ph: 6.8 },
    { time: '04:00', temperature: 16, moisture: 68, ph: 6.7 },
    { time: '08:00', temperature: 22, moisture: 62, ph: 6.9 },
    { time: '12:00', temperature: 28, moisture: 58, ph: 7.0 },
    { time: '16:00', temperature: 26, moisture: 55, ph: 6.8 },
    { time: '20:00', temperature: 21, moisture: 60, ph: 6.9 },
  ]

  const weeklyYield = [
    { week: 'Week 1', predicted: 4.2, current: 4.0 },
    { week: 'Week 2', predicted: 4.5, current: 4.3 },
    { week: 'Week 3', predicted: 4.8, current: 4.6 },
    { week: 'Week 4', predicted: 5.2, current: null },
  ]

  const pestHistory = [
    { date: 'Jan 15', aphids: 2, beetles: 1, moths: 0 },
    { date: 'Jan 22', aphids: 1, beetles: 2, moths: 1 },
    { date: 'Jan 29', aphids: 3, beetles: 1, moths: 0 },
    { date: 'Feb 05', aphids: 1, beetles: 0, moths: 2 },
  ]

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600'
    if (health >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              {field.name}
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {field.cropType} field covering {field.area} hectares
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Health Score</span>
                </div>
                <div className={`text-2xl font-bold ${getHealthColor(field.health)}`}>
                  {field.health}%
                </div>
                <Progress value={field.health} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Soil Moisture</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {field.moisture}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">Optimal range</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {field.temperature}°C
                </div>
                <p className="text-xs text-muted-foreground mt-1">Current reading</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Pest Risk</span>
                </div>
                <Badge className={getRiskColor(field.pestRisk)}>
                  {field.pestRisk}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">Current assessment</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="monitoring" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
              <TabsTrigger value="analysis">Soil Analysis</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Temperature & Moisture Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      Temperature (24h)
                    </CardTitle>
                    <CardDescription>Real-time temperature monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      Soil Moisture (24h)
                    </CardTitle>
                    <CardDescription>Soil moisture levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="moisture" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Current Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Field Conditions</CardTitle>
                  <CardDescription>Live sensor readings and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <CloudRain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="font-semibold">Humidity</div>
                      <div className="text-2xl font-bold text-blue-600">78%</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Activity className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <div className="font-semibold">pH Level</div>
                      <div className="text-2xl font-bold text-green-600">{field.ph}</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="font-semibold">Conductivity</div>
                      <div className="text-2xl font-bold text-yellow-600">1.2 mS/cm</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Target className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <div className="font-semibold">Light Intensity</div>
                      <div className="text-2xl font-bold text-purple-600">45k lux</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* Soil Composition */}
              <Card>
                <CardHeader>
                  <CardTitle>Soil Nutrient Analysis</CardTitle>
                  <CardDescription>Current nutrient levels and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Nitrogen (N)</h4>
                        <p className="text-sm text-muted-foreground">Essential for leaf growth</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{field.nutrients.nitrogen}%</div>
                        <Badge variant="default">Optimal</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Phosphorus (P)</h4>
                        <p className="text-sm text-muted-foreground">Important for root development</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-yellow-600">{field.nutrients.phosphorus}%</div>
                        <Badge variant="secondary">Monitor</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Potassium (K)</h4>
                        <p className="text-sm text-muted-foreground">Supports overall plant health</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{field.nutrients.potassium}%</div>
                        <Badge variant="default">Good</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* pH Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>pH Level Trends</CardTitle>
                  <CardDescription>Soil acidity/alkalinity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6.0, 7.5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ph" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              {/* Yield Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Yield Prediction
                  </CardTitle>
                  <CardDescription>AI-powered yield forecasting based on current conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-600">{field.yieldPrediction} tons/hectare</div>
                    <p className="text-muted-foreground">Expected yield at harvest</p>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyYield}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="predicted" fill="#3b82f6" name="Predicted" />
                      <Bar dataKey="current" fill="#10b981" name="Current" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pest Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    Pest Risk Assessment
                  </CardTitle>
                  <CardDescription>Historical pest activity and risk predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={pestHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="aphids" stackId="1" stroke="#ef4444" fill="#ef4444" />
                      <Area type="monotone" dataKey="beetles" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                      <Area type="monotone" dataKey="moths" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Aphids</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Beetles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Moths</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="management" className="space-y-6">
              {/* Field Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="h-5 w-5" />
                      Crop Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crop Type:</span>
                      <span className="font-medium">{field.cropType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="font-medium">{field.area} hectares</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Planting Date:</span>
                      <span className="font-medium">{field.plantingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Harvest:</span>
                      <span className="font-medium">{field.expectedHarvest}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      Irrigation Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={field.irrigationStatus === 'Active' ? 'default' : 'secondary'}>
                        {field.irrigationStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Irrigation:</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Scheduled:</span>
                      <span className="font-medium">Tomorrow 6:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water Usage Today:</span>
                      <span className="font-medium">145 L/m²</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Latest farming activities and interventions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '2 hours ago', activity: 'Irrigation cycle completed', type: 'irrigation' },
                      { date: '1 day ago', activity: 'Soil moisture sensors calibrated', type: 'maintenance' },
                      { date: '3 days ago', activity: 'Fertilizer application - NPK 20-10-10', type: 'fertilizer' },
                      { date: '1 week ago', activity: 'Pest control spray applied', type: 'pest-control' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.activity}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}