document.addEventListener("DOMContentLoaded", function () {

    // var values = [hide_online, hide_market, show_all]




    let copy_of_chrome_storage = {"hide_online" : 0, "hide_market": 0, "show_all": 0}
    chrome.storage.sync.get({"hide_online" : true, "hide_market": true, "show_all": true}, function(data) { 
        copy_of_chrome_storage = data
        update_states()
    })

    const update_states = () => {
        document.getElementById("local_sellers_only").checked = copy_of_chrome_storage.hide_market
        document.getElementById("online_items_only").checked = copy_of_chrome_storage.hide_online 
        document.getElementById("show_all_results").checked = copy_of_chrome_storage.show_all 
    }


    chrome.storage.onChanged.addListener(function(changes, namespace) {
        console.log(changes)
        copy_of_chrome_storage[Object.keys(changes)] = changes[Object.keys(changes)].newValue
        update_states();
    });


    const toggle_val = (id) => { 
        copy_of_chrome_storage[id] = !copy_of_chrome_storage[id]
        chrome.storage.sync.set({ [id]: copy_of_chrome_storage[id] }, function () {
              update_states()
        });
    }


    document.getElementById("local_sellers_only").addEventListener('change', function() {
        toggle_val("hide_market")
    })
    document.getElementById("online_items_only").addEventListener('change', function() {
        toggle_val("hide_online")
    })
    document.getElementById("show_all_results").addEventListener('change', function() {
        toggle_val("show_all")
    })


  

    //   document.getElementsByClassName("local_sellers_only").checked = state.hide_online ? false : true
});
