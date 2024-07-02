/*
    - There is probably a quicker regex way to do this, cut and dry quick.
*/

const rules = {
  hide_marketplace: {
    id: 1,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "prefv1", value: "The Warehouse" },
              { key: "prefn1", value: "marketplaceItem" },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||thewarehouse.co.nz/search",
      resourceTypes: ["main_frame"],
    },
  },

  hide_marketplace2: {
    id: 2,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "prefv1", value: "The Warehouse" },
              { key: "prefn1", value: "marketplaceItem" },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||thewarehouse.co.nz/c",
      resourceTypes: ["main_frame"],
    },
  },

  hide_online: {
    id: 3,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "prefv1", value: "Store" },
              { key: "prefn1", value: "channelType" },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||thewarehouse.co.nz/c",
      resourceTypes: ["main_frame"],
    },
  },

  hide_online2: {
    id: 4,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "prefv1", value: "Store" },
              { key: "prefn1", value: "channelType" },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||thewarehouse.co.nz/search",
      resourceTypes: ["main_frame"],
    },
  },

  both_1: {
    id: 5,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "prefn1", value: "channelType" },
              { key: "prefv1", value: "Store" },
              { key: "prefn2", value: "marketplaceItem" },
              { key: "prefv2", value: "The Warehouse" },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||thewarehouse.co.nz/search",
      resourceTypes: ["main_frame"],
    },
  },

  both_2: {
    id: 6,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [
              { key: "prefn1", value: "channelType" },
              { key: "prefv1", value: "Store" },
              { key: "prefn2", value: "marketplaceItem" },
              { key: "prefv2", value: "The Warehouse" },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||thewarehouse.co.nz/c",
      resourceTypes: ["main_frame"],
    },
  },
};

const do_rule_load = async () => {
  chrome.storage.sync.get(null, function (data) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1, 2, 3, 4, 5, 6],
    });

    if (data["hide_market"] && data["hide_online"]) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [rules["both_1"], rules["both_2"]],
      });
    } else if (data["hide_market"]) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [rules["hide_marketplace"], rules["hide_marketplace2"]],
      });
    } else if (data["hide_online"]) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [rules["hide_online"], rules["hide_online_2"]],
      });
    }
    return "Success";
  });
};

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  let a = do_rule_load();
  console.log("HELLO")
});

chrome.runtime.onStartup.addListener(() => {
  let b = do_rule_load();
  console.log(b);
});

chrome.runtime.onInstalled.addListener(async () => {
  let b = do_rule_load();
  console.log(b);
});
