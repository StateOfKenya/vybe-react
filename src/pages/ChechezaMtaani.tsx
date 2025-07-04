import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Trophy,
  MapPin,
  Users,
  Calendar,
  Star,
  Medal,
  Target,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getTournamentStandings,
  registerForTournament,
  TournamentRegistration,
} from "@/api/events";
import { useToast } from "@/hooks/useToast";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  age: z
    .number()
    .min(16, "Must be at least 16 years old")
    .max(30, "Must be 30 years or younger"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  constituency: z.string().min(1, "Please select your constituency"),
  competitions: z
    .array(z.string())
    .min(1, "Please select at least one competition"),
  teamName: z.string().optional(),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Emergency contact phone is required"),
});

const constituencies = [
  "Westlands",
  "Dagoretti North",
  "Dagoretti South",
  "Langata",
  "Kibra",
  "Roysambu",
  "Kasarani",
  "Ruaraka",
  "Embakasi South",
  "Embakasi North",
  "Embakasi Central",
  "Embakasi East",
  "Embakasi West",
  "Makadara",
  "Kamukunji",
  "Starehe",
  "Mathare",
  "Nairobi West",
  "Nairobi South",
  "Nairobi Central",
];

const competitions = [
  { id: "skating-100m", name: "Skating - 100m Sprint", category: "Skating" },
  { id: "skating-relay", name: "Skating - 4x100m Relay", category: "Skating" },
  { id: "skating-1km", name: "Skating - 1KM Masters", category: "Skating" },
  {
    id: "modelling-streetwear",
    name: "Modelling - Streetwear",
    category: "Modelling",
  },
  {
    id: "modelling-traditional",
    name: "Modelling - Traditional Attire",
    category: "Modelling",
  },
  {
    id: "modelling-freestyle",
    name: "Modelling - Freestyle",
    category: "Modelling",
  },
  { id: "dance-solo", name: "Dance - Solo", category: "Dance" },
  { id: "dance-group", name: "Dance - Group", category: "Dance" },
  { id: "dance-afro", name: "Dance - Afro-Fusion", category: "Dance" },
];

export function ChechezaMtaani() {
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      age: 18,
      email: "",
      phone: "",
      constituency: "",
      competitions: [],
      teamName: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  useEffect(() => {
    const loadStandings = async () => {
      try {
        console.log("Loading tournament standings...");
        const response = (await getTournamentStandings()) as any;
        setStandings(response.standings);
        console.log("Tournament standings loaded successfully");
      } catch (error: any) {
        console.error("Error loading standings:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load tournament standings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, [toast]);

  const onSubmit = async (values: z.infer<typeof registrationSchema>) => {
    try {
      setIsRegistering(true);
      console.log("Submitting tournament registration:", values);

      const registrationData: TournamentRegistration = {
        personalDetails: {
          fullName: values.fullName,
          age: values.age,
          email: values.email,
          phone: values.phone,
          constituency: values.constituency,
        },
        competitions: values.competitions,
        teamName: values.teamName,
        emergencyContact: {
          name: values.emergencyContactName,
          phone: values.emergencyContactPhone,
        },
      };

      const response = (await registerForTournament(registrationData)) as any;

      if (response.success) {
        setRegistrationId(response.registrationId);
        setRegistrationSuccess(true);
        console.log("Tournament registration successful");
        toast({
          title: "Registration Successful!",
          description: response.message,
        });
      }
    } catch (error: any) {
      console.error("Error submitting registration:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register for tournament",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="relative text-center space-y-6">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-green-600/10 to-yellow-600/10 rounded-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Checheza Mtaani 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Bringing competition to the streets - showcasing talent from every
            corner of Nairobi Metropolitan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Register Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle>Register for Checheza Mtaani 2024</DialogTitle>
                  <DialogDescription>
                    Join the biggest street competition in Nairobi Metropolitan
                  </DialogDescription>
                </DialogHeader>

                {registrationSuccess ? (
                  <div className="text-center space-y-6 py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-600 mb-2">
                        Registration Successful!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You're now registered for Checheza Mtaani 2024
                      </p>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-700 mb-1">
                          Your Registration ID:
                        </p>
                        <p className="font-mono font-bold text-green-800">
                          {registrationId}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter your age"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your.email@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+254 700 000 000"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="constituency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Constituency</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your constituency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {constituencies.map((constituency) => (
                                  <SelectItem
                                    key={constituency}
                                    value={constituency}
                                  >
                                    {constituency}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="competitions"
                        render={() => (
                          <FormItem>
                            <FormLabel>Competition Categories</FormLabel>
                            <FormDescription>
                              Select all competitions you want to participate in
                            </FormDescription>
                            <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                              {competitions.map((competition) => (
                                <FormField
                                  key={competition.id}
                                  control={form.control}
                                  name="competitions"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={competition.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              competition.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    competition.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== competition.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          <Badge
                                            variant="outline"
                                            className="mr-2"
                                          >
                                            {competition.category}
                                          </Badge>
                                          {competition.name}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Name (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter team name if participating in group events"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="emergencyContactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Emergency contact name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="emergencyContactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact Phone</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Emergency contact phone"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-green-500"
                        disabled={isRegistering}
                      >
                        {isRegistering ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Registering...
                          </>
                        ) : (
                          <>
                            <Trophy className="w-4 h-4 mr-2" />
                            Register for Tournament
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </DialogContent>
            </Dialog>

            <Button size="lg" variant="outline">
              <Calendar className="w-5 h-5 mr-2" />
              View Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* Tournament Info */}
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="constituencies">Constituencies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-red-500" />
                <span>Tournament Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Checheza Mtaani represents a paradigm shift in how we think
                about youth competition and community engagement. Unlike
                traditional tournaments held in centralized venues, this
                innovative approach brings the competition directly to the
                streets, making every constituency in Nairobi Metropolitan a
                battleground for talent and creativity.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold">20 Constituencies</h3>
                  <p className="text-sm text-gray-600">
                    Across Nairobi Metropolitan
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">1,250+ Participants</h3>
                  <p className="text-sm text-gray-600">
                    Young talents registered
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold">9 Categories</h3>
                  <p className="text-sm text-gray-600">
                    Skating, Modelling, Dance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <Medal className="w-5 h-5" />
                  <span>Skating</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    100m Sprint
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Individual speed skating competition
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    4x100m Relay
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Team-based relay competition
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    1KM Masters
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Long-distance endurance challenge
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Star className="w-5 h-5" />
                  <span>Modelling</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    Streetwear
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Urban fashion showcase
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    Traditional Attire
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Cultural fashion celebration
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    Freestyle
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Creative expression category
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-700">
                  <Users className="w-5 h-5" />
                  <span>Dance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    Solo
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Individual dance performance
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    Group
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Team choreography showcase
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-white">
                    Afro-Fusion
                  </Badge>
                  <p className="text-sm text-gray-600">
                    African dance fusion category
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="standings" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Current Constituency Standings</CardTitle>
              <CardDescription>
                Live leaderboard updated in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 animate-pulse"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded" />
                      <div className="flex-1 h-4 bg-gray-200 rounded" />
                      <div className="w-16 h-4 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {standings.map((standing, index) => (
                    <div
                      key={standing.constituency}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : index === 2
                              ? "bg-orange-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {standing.constituency}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {standing.participants} participants
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {standing.points} pts
                        </div>
                        <div className="flex space-x-1">
                          {standing.categories.map((category: string) => (
                            <Badge
                              key={category}
                              variant="outline"
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constituencies" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            {constituencies.map((constituency) => (
              <Card
                key={constituency}
                className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">{constituency}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      Participants: {Math.floor(Math.random() * 100) + 20}
                    </div>
                    <div>Categories: {Math.floor(Math.random() * 3) + 1}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
