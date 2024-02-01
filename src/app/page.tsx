"use client";

import {
  Button,
  Card,
  Metric,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
  TextInput,
  Select,
  SelectItem,
  SearchSelect,
  SearchSelectItem,
} from "@tremor/react";
import { KeyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CovalentClient, Chains } from "@covalenthq/client-sdk";
import toast, { Toaster } from "react-hot-toast";

export default () => {
  const [apiKey, setApiKey] = useState("");
  const [eventType, setEventType] = useState("erc20");
  const [chain, setChain] = useState("eth-mainnet");
  const [isLoading, setIsLoading] = useState(false);
  const [gasDetails, setGasDetails] = useState<any>(null);

  // chain dropdownlist
  const chainOptions = Object.values(Chains).map((value) => ({
    value,
    label: value,
  }));

  // event type dropdownlist
  const eventOptions: Record<string, string> = {
    erc20: "ERC 20 Transfer",
    uniswapv3: "Uniswap v3 Swap",
    nativetokens: "Native Token Transfer",
  };

  const handleGasDetails = async () => {
    if (!apiKey) {
      toast.error("API Key is missing. Please provide a valid API Key.");
      return;
    }

    setIsLoading(true);
    var client = new CovalentClient(apiKey);

    let response;
    try {
      response = await client.BaseService.getGasPrices(
        chain as Chains,
        eventType,
        {
          quoteCurrency: "USD",
        }
      );
      console.log(response.data);
      setGasDetails(response.data);
    } catch (error) {
      console.error(`Error fetching chain gas details:`, error);
    }

    setIsLoading(false);
  };

  const handleFetchResults = () => {
    handleGasDetails();
  };

  return (
    <main className="p-12 flex flex-wrap">
      <div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </div>
      <div className="w-full">
        <Title>Covalent Gas Explorer</Title>
        <Text>Discover live gas prices for various blockchain events</Text>
      </div>
      <Grid numItemsMd={1} numItemsLg={3} className="gap-6 mt-6 w-full">
        <Card decoration="top" decorationColor="indigo">
          <Title>Covalent API key</Title>
          <TextInput
            icon={KeyIcon}
            type="password"
            placeholder="cqt_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-2">
            Note: Your API key is confidential and not stored. We prioritize
            your security.
          </p>
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
            Get your free Covalent API key{" "}
            <a
              href="https://www.covalenthq.com/platform/auth/register/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 dark:text-green-300"
            >
              here
            </a>
            !
          </p>
        </Card>
        <Card decoration="top" decorationColor="indigo">
          <Title>Blockchain</Title>
          <SearchSelect
            defaultValue="eth-mainnet"
            enableClear={false}
            onValueChange={setChain}
          >
            {chainOptions.map((option) => (
              <SearchSelectItem key={option.value} value={option.value}>
                {option.label}
              </SearchSelectItem>
            ))}
          </SearchSelect>
        </Card>
        <Card decoration="top" decorationColor="indigo">
          <Title>Event Type</Title>
          <Select
            defaultValue="erc20"
            enableClear={false}
            onValueChange={setEventType}
          >
            {Object.entries(eventOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </Select>
        </Card>
      </Grid>
      <div className="flex justify-center mt-6">
        <Button size="xl" onClick={handleFetchResults} disabled={isLoading}>
          {isLoading ? "Loading.." : "Fetch Gas Prices"}
        </Button>
      </div>
      <TabGroup className="mt-20">
        <TabList>
          <Tab>Results</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <div className="h-32">
                  <Card
                    className="max-w-xl mx-auto"
                    decoration="top"
                    decorationColor="fuchsia"
                  >
                    <Text>
                      {gasDetails
                        ? `Gas cost for ${
                            eventOptions[gasDetails.event_type]
                          } on ${gasDetails.chain_name}`
                        : "Gas cost for ERC 20 Transfer on eth-mainnet"}
                    </Text>
                    <Text>Last 1 minute</Text>
                    {isLoading ? (
                      <p>Loading...</p> // You can replace this with a loading spinner or other indicator
                    ) : (
                      <Metric>
                        {gasDetails?.items[0]?.pretty_total_gas_quote ??
                          "No data available"}
                      </Metric>
                    )}
                  </Card>
                </div>
              </Card>
              <Card>
                <div className="h-32">
                  <Card
                    className="max-w-xl mx-auto"
                    decoration="top"
                    decorationColor="fuchsia"
                  >
                    <Text>
                      {gasDetails
                        ? `Gas cost for ${
                            eventOptions[gasDetails.event_type]
                          } on ${gasDetails.chain_name}`
                        : "Gas cost for ERC 20 Transfer on eth-mainnet"}
                    </Text>
                    <Text>Last 3 minute</Text>
                    {isLoading ? (
                      <p>Loading...</p> // You can replace this with a loading spinner or other indicator
                    ) : (
                      <Metric>
                        {gasDetails?.items[1]?.pretty_total_gas_quote ??
                          "No data available"}
                      </Metric>
                    )}
                  </Card>
                </div>
              </Card>
              <Card>
                <div className="h-32">
                  <Card
                    className="max-w-xl mx-auto"
                    decoration="top"
                    decorationColor="fuchsia"
                  >
                    <Text>
                      {gasDetails
                        ? `Gas cost for ${
                            eventOptions[gasDetails.event_type]
                          } on ${gasDetails.chain_name}`
                        : "Gas cost for ERC 20 Transfer on eth-mainnet"}
                    </Text>
                    <Text>Last 5 minute</Text>
                    {isLoading ? (
                      <p>Loading...</p> // You can replace this with a loading spinner or other indicator
                    ) : (
                      <Metric>
                        {gasDetails?.items[2]?.pretty_total_gas_quote ??
                          "No data available"}
                      </Metric>
                    )}
                  </Card>
                </div>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
